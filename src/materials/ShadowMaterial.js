import { Material } from './Material.js';
import { Color } from '../math/Color.js';

class ShadowMaterial extends Material {

	constructor( parameters ) {

		super();

		this.isShadowMaterial = true;

		this.type = 'ShadowMaterial';

		this.color = new Color( 0x000000 );
		this.transparent = true;

		this.fog = true;

		this.setValues( parameters );

	}

	copy( source ) {

		super.copy( source );

		this.color.copy( source.color );

		this.fog = source.fog;
		
		this.ditheredHole = source.ditheredHole;

		return this;

	}

}

export { ShadowMaterial };
