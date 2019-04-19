/* ************************************************* */
/*                      LOGGING                      */
/* ************************************************* */
export class Logging {
    static success(message:string):void {
        console.log(`%c ${message}`, 'color:seagreen; font-size:1.1em; font-weight:bold; border-left: solid 3px seagreen;')    ;
    }

    static message(message:string):void {
        console.log(`%c ${message}`, 'color:#1E265C; font-size:1.1em; font-weight:bold; border-left: solid 3px #1E265C;');
    }

    static error(message:string):void {
        console.log(`%c ${message}`, 'color:red; font-size:1.1em; border-left: solid 3px red;');
    }
}