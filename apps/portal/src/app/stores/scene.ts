import 'reflect-metadata';
import { makeObservable, makeAutoObservable, observable, action, toJS } from 'mobx';
import {
  SceneObjectProps,
  DialogInfoProps,
  SceneMainProps,
  CurrentSceneProps,
  TerrainProps,
} from './scene-props';

import {
  terrainById,
  terrainsById,
  sceneById,
  terrainNavigation
} from '../api';

class SceneStore {
  @observable scenes = [];
  @observable sceneObjects = [];
  @observable terrain = null;
  @observable terrains = null;
  @observable state = "pending"; // "pending", "done" or "error"
  @observable showDialogInfo = false;
  @observable dialogInfo = {};
  @observable stateTerrainNavigation = "pending";
  @observable terrainNavigation = [];
  @observable getTerrainState = "pending";

  constructor() {
    makeAutoObservable(this)
  }

  getScenes() {
    const url = sceneById();
    fetch(url)
      .then(response => response.json())
      .then(result => {
        this.scenes = result;
      })
  }

  getScene(id: number) {
    const url = sceneById();
    this.sceneObjects = []
    this.state = "pending"
    fetch(url)
      .then(response => response.json())
      .then(result => {
        this.sceneObjects = result[id].sceneObjects;
        this.state = "done";
      })
  }

  getTerrains() {
    const url = terrainsById();
    this.state = "pending"
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const resultTerrains = result[0].sceneObjects[1].terrains || [];
        this.terrains = resultTerrains;
        this.state = "done";
      })
  }

  getTerrain(id: number) {
    const url = terrainById();
    this.getTerrainState = "pending"
    fetch(url)
      .then(response => {
        const mainresponse = response.json();
        return mainresponse;
      })
      .then(result => {
        const resultTerrain = result[0]?.sceneObjects[0]?.terrains[id] || {};
        this.terrains = result[0]?.sceneObjects[0]?.terrains;
        this.terrain = resultTerrain;
        this.getTerrainState = "done";
      })
  }

  getTerrainData() {
    return toJS(this.terrain)
  }

  getTerrainsData() {
    return toJS(this.terrains)
  }

  getScenesData() {
    return toJS(this.scenes)
  }

  getInfoDialog(props: DialogInfoProps) {
    if (props) {
      this.showDialogInfo = true;
      this.dialogInfo = props;
    }
  }

  closeInfoDialog() {
    this.showDialogInfo = false;
  }

}

const sceneStore = new SceneStore();

export default sceneStore;
export { SceneStore };
