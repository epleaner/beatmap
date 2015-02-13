(function() {
	'use strict';

	var root = this;

	root.define([
		'models/albumGrid'
		],
		function( Albumgrid ) {

			describe('Albumgrid Model', function () {

				it('should be an instance of Albumgrid Model', function () {
					var albumGrid = new Albumgrid();
					expect( albumGrid ).to.be.an.instanceof( Albumgrid );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );