package com.dejssa.radioserver

import android.media.AudioManager
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.dejssa.radioserver.Service.*
import com.dejssa.radioserver.storage.model.File
import com.dejssa.radioserver.storage.model.WebProjectFiles
import kotlinx.android.synthetic.main.activity_main.*
import org.yaml.snakeyaml.Yaml
import java.io.IOException
import java.util.*


class MainActivity : AppCompatActivity() {
    private var httpServer: Server = Server()
    private var serverUp = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        serverButton.setOnClickListener {
            serverUp = if(!serverUp){
                startServer()
                true
            } else{
                stopServer()
                false
            }
        }
    }

    private fun startServer() {
        httpServer.context = this.applicationContext
        httpServer.files = loadWebPageFiles()
        httpServer.audioManager = this.getSystemService(AUDIO_SERVICE) as AudioManager

        httpServer.start()
        serverTextView.text = getString(R.string.server_up)
        serverButton.text = getString(R.string.stop_server)
    }

    private fun stopServer() {
        httpServer.stop();
        serverTextView.text = getString(R.string.server_down)
        serverButton.text = getString(R.string.start_server)
    }

    private fun loadWebPageFiles(): WebProjectFiles {
        val includeFile = loadFile("include.yaml")

        val yaml = Yaml()
        val includedFiles = yaml.load(String(includeFile)) as ArrayList<String>
        val includedFilesContent: ArrayList<File> = ArrayList()

        includedFiles.forEach {
            val fileContent = loadFile(it)

            includedFilesContent.add(File(it, String(fileContent), fileContent))
        }

        return WebProjectFiles(includedFilesContent)
    }

    private fun loadFile(fileName: String): ByteArray {
        var buffer = ByteArray(0)

        try {
            val inputStream = assets.open(fileName)
            val size: Int = inputStream.available()
            buffer = ByteArray(size)
            inputStream.read(buffer)
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return buffer
    }
}

