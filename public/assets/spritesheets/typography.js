(function(window) {
Typography = function() {
	this.initialize();
}
Typography._SpriteSheet = new createjs.SpriteSheet({images: ["assets/spritesheets/typography.png"], frames: [[0,329,27,44,0,0,0],[89,47,21,44,0,0,0],[63,47,23,44,0,0,0],[32,141,24,44,0,0,0],[89,94,21,44,0,0,0],[110,141,20,44,0,0,0],[34,94,26,44,0,0,0],[0,188,28,44,0,0,0],[152,282,14,44,0,0,0],[158,94,16,44,0,0,0],[59,141,24,44,0,0,0],[136,94,19,44,0,0,0],[0,47,32,44,0,0,0],[0,141,29,44,0,0,0],[0,235,28,44,0,0,0],[86,141,21,44,0,0,0],[0,282,28,44,0,0,0],[63,94,23,44,0,0,0],[156,141,17,44,0,0,0],[81,235,21,44,0,0,0],[30,329,27,44,0,0,0],[66,0,24,44,0,0,0],[0,0,35,44,0,0,0],[31,188,23,44,0,0,0],[31,235,22,44,0,0,0],[57,188,23,44,0,0,0],[108,329,18,44,0,0,0],[60,329,21,44,0,0,0],[159,47,17,44,0,0,0],[118,0,20,44,0,0,0],[129,329,18,44,0,0,0],[169,282,14,44,0,0,0],[113,47,20,44,0,0,0],[84,329,21,44,0,0,0],[171,329,12,44,0,0,0],[186,282,12,44,0,0,0],[113,94,20,44,0,0,0],[191,188,12,44,0,0,0],[0,94,31,44,0,0,0],[56,235,22,44,0,0,0],[60,282,22,44,0,0,0],[108,188,20,44,0,0,0],[85,282,20,44,0,0,0],[177,94,15,44,0,0,0],[184,0,15,44,0,0,0],[179,47,15,44,0,0,0],[31,282,22,44,0,0,0],[131,282,18,44,0,0,0],[38,0,25,44,0,0,0],[150,329,18,44,0,0,0],[108,282,20,44,0,0,0],[152,235,18,44,0,0,0],[35,47,25,44,0,0,0],[153,188,16,44,0,0,0],[83,188,22,44,0,0,0],[131,188,19,44,0,0,0],[93,0,22,44,0,0,0],[129,235,20,44,0,0,0],[133,141,20,44,0,0,0],[141,0,20,44,0,0,0],[105,235,21,44,0,0,0],[136,47,20,44,0,0,0],[194,141,12,44,0,0,0],[195,94,12,44,0,0,0],[197,47,12,44,0,0,0],[172,188,16,44,0,0,0],[176,141,15,44,0,0,0],[173,235,14,44,0,0,0],[164,0,17,44,0,0,0]],  animations: {A:[0,0, true], B:[1,1, true], C:[2,2, true], D:[3,3, true], E:[4,4, true], F:[5,5, true], G:[6,6, true], H:[7,7, true], I:[8,8, true], J:[9,9, true], K:[10,10, true], L:[11,11, true], M:[12,12, true], N:[13,13, true], O:[14,14, true], P:[15,15, true], Q:[16,16, true], R:[17,17, true], S:[18,18, true], T:[19,19, true], U:[20,20, true], V:[21,21, true], W:[22,22, true], X:[23,23, true], Y:[24,24, true], Z:[25,25, true], a:[26,26, true], b:[27,27, true], c:[28,28, true], d:[29,29, true], e:[30,30, true], f:[31,31, true], g:[32,32, true], h:[33,33, true], i:[34,34, true], j:[35,35, true], k:[36,36, true], l:[37,37, true], m:[38,38, true], n:[39,39, true], o:[40,40, true], p:[41,41, true], q:[42,42, true], r:[43,43, true], s:[44,44, true], t:[45,45, true], u:[46,46, true], v:[47,47, true], w:[48,48, true], x:[49,49, true], y:[50,50, true], z:[51,51, true], 0:[52,52, true], 1:[53,53, true], 2:[54,54, true], 3:[55,55, true], 4:[56,56, true], 5:[57,57, true], 6:[58,58, true], 7:[59,59, true], 8:[60,60, true], 9:[61,61, true], ".":[62,62, true], ",":[63,63, true], "'":[64,64, true], "\"":[65,65, true], "?":[66,66, true], "!":[67,67, true], "$":[68,68, true]}});
var Typography_p = Typography.prototype = new createjs.Sprite();
Typography_p.Sprite_initialize = Typography_p.initialize;
Typography_p.initialize = function() {
	this.Sprite_initialize(Typography._SpriteSheet);
	this.paused = false;
}
// Typography_p.A = function(){
// 	this.gotoAndPlay("A");
// }
// Typography_p.B = function(){
// 	this.gotoAndPlay("B");
// }
// Typography_p.C = function(){
// 	this.gotoAndPlay("C");
// }
// Typography_p.D = function(){
// 	this.gotoAndPlay("D");
// }
// Typography_p.E = function(){
// 	this.gotoAndPlay("E");
// }
// Typography_p.F = function(){
// 	this.gotoAndPlay("F");
// }
// Typography_p.G = function(){
// 	this.gotoAndPlay("G");
// }
// Typography_p.H = function(){
// 	this.gotoAndPlay("H");
// }
// Typography_p.I = function(){
// 	this.gotoAndPlay("I");
// }
// Typography_p.J = function(){
// 	this.gotoAndPlay("J");
// }
// Typography_p.K = function(){
// 	this.gotoAndPlay("K");
// }
// Typography_p.L = function(){
// 	this.gotoAndPlay("L");
// }
// Typography_p.M = function(){
// 	this.gotoAndPlay("M");
// }
// Typography_p.N = function(){
// 	this.gotoAndPlay("N");
// }
// Typography_p.O = function(){
// 	this.gotoAndPlay("O");
// }
// Typography_p.P = function(){
// 	this.gotoAndPlay("P");
// }
// Typography_p.Q = function(){
// 	this.gotoAndPlay("Q");
// }
// Typography_p.R = function(){
// 	this.gotoAndPlay("R");
// }
// Typography_p.S = function(){
// 	this.gotoAndPlay("S");
// }
// Typography_p.T = function(){
// 	this.gotoAndPlay("T");
// }
// Typography_p.U = function(){
// 	this.gotoAndPlay("U");
// }
// Typography_p.V = function(){
// 	this.gotoAndPlay("V");
// }
// Typography_p.W = function(){
// 	this.gotoAndPlay("W");
// }
// Typography_p.X = function(){
// 	this.gotoAndPlay("X");
// }
// Typography_p.Y = function(){
// 	this.gotoAndPlay("Y");
// }
// Typography_p.Z = function(){
// 	this.gotoAndPlay("Z");
// }
// Typography_p.a = function(){
// 	this.gotoAndPlay("a");
// }
// Typography_p.b = function(){
// 	this.gotoAndPlay("b");
// }
// Typography_p.c = function(){
// 	this.gotoAndPlay("c");
// }
// Typography_p.d = function(){
// 	this.gotoAndPlay("d");
// }
// Typography_p.e = function(){
// 	this.gotoAndPlay("e");
// }
// Typography_p.f = function(){
// 	this.gotoAndPlay("f");
// }
// Typography_p.g = function(){
// 	this.gotoAndPlay("g");
// }
// Typography_p.h = function(){
// 	this.gotoAndPlay("h");
// }
// Typography_p.i = function(){
// 	this.gotoAndPlay("i");
// }
// Typography_p.j = function(){
// 	this.gotoAndPlay("j");
// }
// Typography_p.k = function(){
// 	this.gotoAndPlay("k");
// }
// Typography_p.l = function(){
// 	this.gotoAndPlay("l");
// }
// Typography_p.m = function(){
// 	this.gotoAndPlay("m");
// }
// Typography_p.n = function(){
// 	this.gotoAndPlay("n");
// }
// Typography_p.o = function(){
// 	this.gotoAndPlay("o");
// }
// Typography_p.p = function(){
// 	this.gotoAndPlay("p");
// }
// Typography_p.q = function(){
// 	this.gotoAndPlay("q");
// }
// Typography_p.r = function(){
// 	this.gotoAndPlay("r");
// }
// Typography_p.s = function(){
// 	this.gotoAndPlay("s");
// }
// Typography_p.t = function(){
// 	this.gotoAndPlay("t");
// }
// Typography_p.u = function(){
// 	this.gotoAndPlay("u");
// }
// Typography_p.v = function(){
// 	this.gotoAndPlay("v");
// }
// Typography_p.w = function(){
// 	this.gotoAndPlay("w");
// }
// Typography_p.x = function(){
// 	this.gotoAndPlay("x");
// }
// Typography_p.y = function(){
// 	this.gotoAndPlay("y");
// }
// Typography_p.z = function(){
// 	this.gotoAndPlay("z");
// }
// Typography_p.0 = function(){
// 	this.gotoAndPlay("0");
// }
// Typography_p.1 = function(){
// 	this.gotoAndPlay("1");
// }
// Typography_p.2 = function(){
// 	this.gotoAndPlay("2");
// }
// Typography_p.3 = function(){
// 	this.gotoAndPlay("3");
// }
// Typography_p.4 = function(){
// 	this.gotoAndPlay("4");
// }
// Typography_p.5 = function(){
// 	this.gotoAndPlay("5");
// }
// Typography_p.6 = function(){
// 	this.gotoAndPlay("6");
// }
// Typography_p.7 = function(){
// 	this.gotoAndPlay("7");
// }
// Typography_p.8 = function(){
// 	this.gotoAndPlay("8");
// }
// Typography_p.9 = function(){
// 	this.gotoAndPlay("9");
// }
// Typography_p.. = function(){
// 	this.gotoAndPlay(".");
// }
// Typography_p., = function(){
// 	this.gotoAndPlay(",");
// }
// Typography_p.' = function(){
// 	this.gotoAndPlay("'");
// }
// Typography_p." = function(){
// 	this.gotoAndPlay(""");
// }
// Typography_p.? = function(){
// 	this.gotoAndPlay("?");
// }
// Typography_p.! = function(){
// 	this.gotoAndPlay("!");
// }
// Typography_p.$ = function(){
// 	this.gotoAndPlay("$");
// }
window.Typography = Typography;
}(window));

