import {
  TerrainProps,
  StoreMenuProps,
  StoreSceneProps
} from '../../stores/scene-props';

export type AppMapProps = {
  sceneStore?: StoreSceneProps;
}

export type AppMapSceneProps = {
  terrain: TerrainProps;
  getDetail: Function;
}
