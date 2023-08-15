import React, { useRef, useState, useEffect } from "react";
import { DoubleSide, RepeatWrapping, sRGBEncoding, Vector3 } from "three";

import { TerrainObjectsProps } from '../../../../stores/scene-props';

function Box(props: TerrainObjectsProps) {
  const {
    position,
    args,
    color,
    getDetail,
    dialog
  } = props;

  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const pos = new Vector3(position?.[0], position?.[1], position?.[2]);

  useEffect(() => {
    if (clicked && dialog?.title ) {
      getDetail && getDetail(dialog);
      click(false)
    }
  }, [clicked]);

  return (
    <mesh
      position={pos}
      // {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      >
      <boxGeometry args={[args?.[0], args?.[1], args?.[2]]} />
      <meshStandardMaterial color={props.color} />
      <meshStandardMaterial color={hovered ? 'grey' : props.color || 'green'} />
    </mesh>
  )
}

export default Box;
