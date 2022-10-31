import {SimpleMeshLayer} from '@deck.gl/mesh-layers';

import {isWebGL2} from '@luma.gl/core';
import {hasFeature, FEATURES} from '@luma.gl/webgl';

import vertex from './vertex.glsl';
import fragment from './fragment.glsl';

export default class LiveTerrainLayer extends SimpleMeshLayer{

  getShaders() {
    const transpileToGLSL100 = !isWebGL2(this.context.gl);

    const defines = {};

    if (hasFeature(this.context.gl, FEATURES.GLSL_DERIVATIVES)) {
      defines.DERIVATIVES_AVAILABLE = 1;
    }

    return Object.assign({}, super.getShaders(), {
      fs: fragment,
      vs: vertex
    });
  }

}
