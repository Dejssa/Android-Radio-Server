package com.dejssa.radioserver.Database

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class SQLBase(context: Context) : SQLiteOpenHelper(context, "stations", null, 2) {
    override fun onCreate(sql: SQLiteDatabase) {
        sql.execSQL("CREATE TABLE IF NOT EXISTS stations (uuid text primary key, url text, title varchar(32));")
    }

    override fun onUpgrade(sql: SQLiteDatabase, old_v: Int, new_v: Int) {

    }

}