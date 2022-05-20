package com.dejssa.radioserver

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import java.io.IOException
import com.dejssa.radioserver.Service.*

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
        httpServer.pageFile = loadWebPage()
        httpServer.start()
        serverTextView.text = getString(R.string.server_up)
        serverButton.text = getString(R.string.stop_server)
    }

    private fun stopServer() {
        if (httpServer != null) {
            httpServer.stop();
            serverTextView.text = getString(R.string.server_down)
            serverButton.text = getString(R.string.start_server)
        }
    }

    private  fun loadWebPage(): String {
        var webPageContent = ""
        try {
            val inputStream = assets.open("index.html")
            val size: Int = inputStream.available()
            val buffer = ByteArray(size)
            inputStream.read(buffer).toString()
            webPageContent = String(buffer)
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return webPageContent;
    }
}

