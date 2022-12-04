package com.syfrn;

import android.content.Context;
import android.hardware.Camera;
import android.hardware.camera2.CameraManager;
import android.os.Build;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FlashLight extends ReactContextBaseJavaModule{
    private Camera camera;
    private Boolean isLightOn = false;
    private final ReactApplicationContext myReactContext;
    public FlashLight(ReactApplicationContext reactContext) {
        super(reactContext);
        this.myReactContext = reactContext;
    }

    /**
     * 继承ReactContextBaseJavaModule后重写的方法，返回一个模块名称，rn通过NativeModules可以调用此模块
     */
    @Override
    public String getName() {
        return "FlashLight";
    }

    /**
     * @param state 控制手电筒开关，true:打开，false：关闭
     * @param successCallback 打开成功的回调
     * @param failCallback 打开失败的回调
     */
    @ReactMethod
    public void switchState(Boolean state, Callback successCallback, Callback failCallback) {
        if (isM()) {
            CameraManager cameraManager = (CameraManager) this.myReactContext.getSystemService(Context.CAMERA_SERVICE);
            try {
                String camreaId = cameraManager.getCameraIdList()[0];
                cameraManager.setTorchMode(camreaId, state);
                successCallback.invoke(true);
            }catch (Exception e) {
                String errorMessage = e.getMessage();
                failCallback.invoke(errorMessage);
            }
        } else {
            Camera.Parameters params;
            if (!isLightOn) {
                camera = Camera.open();
                params = camera.getParameters();
                params.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
                camera.setParameters(params);
                camera.startPreview();
                isLightOn = true;
            } else {
                params = camera.getParameters();
                params.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
                camera.setParameters(params);
                camera.stopPreview();
                camera.release();
                isLightOn = false;
            }

        }
    }

    private boolean isM() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return true;
        } else {
            return false;
        }
    }
}