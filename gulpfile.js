import { src, dest, watch, series } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

//Compilamos sass, utilizando la dependencia de gulpsass, y le decimos donde va a encontrar
//la dependencia de sass.

const sass = gulpSass(dartSass);

//Llamamos a tods las tareas de js
export function js(done) {
  src("src/js/app.js") //toma el archivo
    .pipe(dest("build/js")); // lo almacenamos
  done();
}

//Creaos una tarea
export function css(done) {
  src("src/scss/app.scss", { sourcemaps: true }) //ubicar el archivo
    .pipe(sass().on("error", sass.logError)) //compilamos
    .pipe(dest("build/css", { sourcemaps: true })); //almacenamos
  done();
}

export function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", js);
}

export default series(js, css, dev); //Series me sirve para ejecutar multiples tareas
