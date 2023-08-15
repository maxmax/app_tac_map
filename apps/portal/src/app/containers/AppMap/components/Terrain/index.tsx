import React, { useState, useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
// import { DoubleSide, RepeatWrapping, sRGBEncoding, LinearFilter, Color } from "three";
import { DoubleSide, RepeatWrapping, sRGBEncoding, Color, UniformsUtils, UniformsLib } from "three";
import { TerrainPlaneProps } from '../../../../stores/scene-props';
import { vertexShader, fragmentShader } from "./shaders";

function Terrain({
  uluruHeightmap,
  texturemap,
  geometry,
  shaderMaterial
}: TerrainPlaneProps) {

  // Load the heightmap image
  // const heightMap = useTexture("/uluru-heightmap.png");
  let heightMap = useTexture(uluruHeightmap);
  // Apply some properties to ensure it renders correctly
  heightMap.encoding = sRGBEncoding;
  heightMap.wrapS = RepeatWrapping;
  heightMap.wrapT = RepeatWrapping;
  // heightMap.magFilter = LinearFilter;
  heightMap.anisotropy = 16;

  // Load the texture map
  // const textureMap = useTexture("/texturemap1024.png");
  let textureMap = useTexture(texturemap);
  // Apply some properties to ensure it renders correctly
  //textureMap.encoding = sRGBEncoding;
  textureMap.wrapS = RepeatWrapping;
  textureMap.wrapT = RepeatWrapping;
  textureMap.anisotropy = 16;

  const uniformsUtilsFog = UniformsUtils.merge([UniformsLib['fog']]);

  const uniformsUtilsLights = UniformsUtils.merge([UniformsLib['lights'],
    { diffuse: { type: 'c', value: new Color(0xff00ff) } }
    // { "uniform1": { value: 1.0 }, "uniform2": { value: 2 } }
  ]);

  // if (!reload) return <p>Fetching user details...</p>

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[1 / 1024, 1 / 1024, 1 / 1024]}
      // ref={mesh2Ref}
      onUpdate={(self) => console.log('props have been updated', self)}
    >
      {/*<planeBufferGeometry args={[1024, 1024, 256, 256]} />*/}
      <planeBufferGeometry args={[
        geometry[0],
        geometry[1],
        geometry[2],
        geometry[3],
      ]} />
      {/*<boxGeometry args={[1024, 1024, 10]} />*/}
        <shaderMaterial
        // ref={shaderMaterialRef}
        uniforms={{
          // Feed the heightmap
          bumpTexture: { value: heightMap },
          // Feed the scaling constant for the heightmap
          // bumpScale: { value: 50 },
          bumpScale: { value: shaderMaterial.bumpScale.value },
          // Feed the texture map
          terrainTexture: { value: textureMap },
          ...uniformsUtilsFog,
          ...uniformsUtilsLights
          //fogColor:    { value: fogColor },
          //fogNear:     { value: 200 },
          //fogFar:      { value: 400 },
          // fog: true,
          // ...shaderMaterial
        }}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // side={DoubleSide}
        fog={true}
        lights={true}
        // ref={mesh2Ref}
        // opacity={0.6}
        transparent={true}
      />
    </mesh>
  );
}

export default Terrain;
