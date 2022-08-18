package com.dejssa.radioserver.repository

import android.content.Context
import android.database.Cursor
import com.dejssa.radioserver.Database.SQLBase
import com.dejssa.radioserver.storage.domain.StationInfo
import java.util.*

class StationRepository (context: Context) {

    private val table = "stations"

    private val base = SQLBase(context)

    fun save(station: StationInfo){
        val sql = base.writableDatabase
        val query = "INSERT INTO $table (uuid, url, title) VALUES('${station.UUID}','${station.URL}', '${station.Title}')"
        sql.execSQL(query)
        sql.close()
    }

    fun get(uuid: String): StationInfo?{
        val sql = base.readableDatabase
        val cursor = sql.rawQuery( "SELECT * FROM $table WHERE uuid = ?", Array(1){uuid})

        if(cursor.moveToFirst()){
            val uuid = cursor.getString(cursor.getColumnIndex("uuid"))
            val url = cursor.getString(cursor.getColumnIndex("url"))
            val title = cursor.getString(cursor.getColumnIndex("title"))

            cursor. close()

            return StationInfo(uuid, url, title)
        }

        cursor.close()
        sql.close()

        return null
    }

    fun find(): ArrayList<StationInfo> {
        val sql = base.readableDatabase
        val list = ArrayList<StationInfo>()
        val cursor:Cursor = sql.rawQuery("SELECT * FROM $table", Array<String>(0){""})

        if(cursor.moveToFirst()){
            do {
                val uuid = cursor.getString(cursor.getColumnIndex("uuid"))
                val url = cursor.getString(cursor.getColumnIndex("url"))
                val title = cursor.getString(cursor.getColumnIndex("title"))

                list.add(StationInfo(uuid, url, title))

            } while(cursor.moveToNext())
        }
        cursor.close()
        return list
    }

    fun delete(uuid: String) {
        val sql = base.readableDatabase
        val query = "DELETE FROM $table WHERE uuid = '$uuid'"
        sql.execSQL(query)
        sql.close()
    }
}