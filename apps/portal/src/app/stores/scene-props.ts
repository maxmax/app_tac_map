export type TerrainPlaneProps = {
  texturemap: string;
  uluruHeightmap2: string;
  uluruHeightmap: string;
  geometry: number[];
  shaderMaterial: {
    bumpScale: {
      value: number;
    }
  }
}

export type TerrainFogProps = {
  color: string;
  density: number;
}

export type TerrainObjectsProps = {
  args?: number[];
  position?: number[];
  color?: string;
  getDetail?: Function;
  dialog?: DialogInfoProps;
  fog?: boolean;
}

export type TerrainProps = {
  id: number | string;
  name: string;
  pointLight: number[];
  perspectiveCamera: {
    position: number[];
    near: string;
    far: string;
  },
  plane: TerrainPlaneProps;
  objects: TerrainObjectsProps[];
  terrainFog: TerrainFogProps;
}

export type DialogInfoTypeTable = {
  name: string,
  value: string | number
}

export type DialogInfoTable = {
  name: string;
  title: string;
  value?: string | string[];
  table?: DialogInfoTypeTable[];
}

export type DialogInfoProps = {
  title: string;
  text: string;
  next?: DialogInfoTypeTable;
  table: DialogInfoTable [];
}

export type SceneObjectProps = {
  id?: number | string;
  type?: string;
  args?: number[];
  position?: number[];
  radian?: {
    rotationSpeed: number;
    axis: number[];
  };
  scale?: number[];
  getDetail?: Function;
  visible: boolean;
  color?: string;
  name?: string;
  opacity?: number;
  texture?: string;
  rotation?: number;
  сomposition?: {};
  description?: string;
  gltfUrl?: string;
  terrains?: TerrainProps[];
  terrain?: TerrainProps;
  dialogInfo?: DialogInfoProps;
}

type SceneMainObjectProps = {
  id: number | string;
  type: string;
  args?: number[];
  position?: number[];
  gltf: string;
  scale?: number[];
  rotation?: number[];
}

export type SceneMainProps = {
  main?: SceneMainObjectProps;
  secondary?: SceneMainObjectProps;
  objects?: SceneObjectProps[];
}

export type CurrentSceneProps = {
  ambientLight?: {}
}

export type StoreMenuProps = {
  show: boolean;
  toggleHeadPanel: Function;
}

export type StoreSceneProps = {
  terrains?: TerrainProps[];
  terrain?: TerrainProps;
  mainObject?: SceneMainProps;
  getTerrains?: Function;
  getTerrain?: Function;
  getTerrainData: Function;
  getTerrainsData: Function;
  state: string;
  getTerrainState: string;
  getInfoDialog?: Function;
  getTerrainNavigation?: Function;
  stateTerrainNavigation: string;
  terrainNavigation: [];
  getTerrainNavigationData: Function;
}
