package com.nfcproject

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.pm.PackageManager
import android.content.Intent

class MyService(private val reactContext:ReactApplicationContext):ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "MyService"
    }

    fun show(message: String) {
        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()
    }

    @ReactMethod
    fun openApp( packageName: String) {
        val pm: PackageManager = reactContext.getPackageManager()
        val intent: Intent? = pm.getLaunchIntentForPackage(packageName)
        if (intent != null) {
            this.show("Opening $packageName")
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) // Ensure the activity is started in a new task
            reactContext.startActivity(intent)
        } else {
            this.show("Could not open $packageName")
        }
    }

}
