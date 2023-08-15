import React, { useEffect } from "react";
import { useThree } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 0.5;
      controls.maxDistance = 1.5;
      controls.minAzimuthAngle = 0;
      // controls.maxAzimuthAngle = 0;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = 1.2;

      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

export default CameraController;
