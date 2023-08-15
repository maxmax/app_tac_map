import React, { Suspense, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import styled from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { DoubleSide, RepeatWrapping, sRGBEncoding, Vector3, Color } from "three";
import {
  Loader,
  PerspectiveCamera,
} from "@react-three/drei";

import { GroupBar } from '../../components/GroupBar';
import DialogInfo from '../../components/DialogInfo';
import Box from './components/Box';
import CameraController from './components/CameraController';
import Terrain from './components/Terrain';

import {
  TerrainPlaneProps,
  TerrainObjectsProps,
  DialogInfoProps
} from '../../stores/scene-props';

import { AppMapProps, AppMapSceneProps } from "./props";


const StyledAppBase = styled.div`
  height: 100vh;
  width: 100vw;
  canvas {
    height: 100vh;
  }
`;

function AppMapScene(props: AppMapSceneProps) {

  const { pointLight, perspectiveCamera, objects, terrainFog, plane }: any = props?.terrain;

  return (
    <>
      <DialogInfo />
      <Canvas shadows dpr={[1, 2]}>
        {terrainFog && terrainFog?.color && <color attach="background" args={[terrainFog.color]} /> }

        <ambientLight />
        <directionalLight color="0xFFFFFF" intensity={2} position={[4, 2, 4]} />

        {terrainFog && terrainFog?.color && <fogExp2 attach="fog" color={new Color(terrainFog.color)} density={terrainFog.density} />}


        <PerspectiveCamera
          position={[0.5, 0.5, 0.5]}
          aspect={1}
          fov={40}
          near={0.1}
          far={5}
          { ...perspectiveCamera }
          makeDefault
        />

        <Suspense fallback={null}>
          <Terrain { ...plane }/>
        </Suspense>

        {objects?.map((obj: TerrainObjectsProps) => {
          return (
            <>
              <Box
                args={obj?.args || [0.02, 0.02, 0.02]}
                position={obj?.position || [0.05, 0.01, 0.2]}
                color={obj?.color || 'green'}
                getDetail={props.getDetail}
                fog={true}
                {...obj}
              />
            </>
          );
        })}
        <CameraController />
      </Canvas>
      <Loader />
    </>
  );
}

const AppMap = inject('sceneStore')(observer(({ sceneStore }: AppMapProps) => {

  const { id } = useParams();

  const getDetail = (props: DialogInfoProps) => {
    sceneStore?.getInfoDialog && sceneStore?.getInfoDialog(props);
  }

  useEffect(() => {
    sceneStore?.getTerrain && sceneStore.getTerrain(id || 0);
  }, [id]);

  return (
    <>
      <StyledAppBase>
        {sceneStore?.terrains && <GroupBar terrains={sceneStore?.terrains} />}
        {sceneStore?.terrain &&
          <>
            <AppMapScene
              terrain={sceneStore?.terrain}
              getDetail={getDetail} />
          </>
        }
      </StyledAppBase>
    </>
  )
}));

export default AppMap;
