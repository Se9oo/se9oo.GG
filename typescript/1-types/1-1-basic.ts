{
  /*
  * JavaScript
  * Primitive: number, string, boolean, bigint, symbol, null, undefined
  * Object: function, array....
  */

  // number
  const num:number = 1;

  // string
  const str:string = 'hello';

  // boolean
  const bool:boolean = false;

  // undefined (가능하면 쓰지말자)
  let name: undefined; // x
  let age: number | undefined; // o (number or undefined)
  age = undefined;
  age = 1;

  // return 값은 number or undefined
  function find(): number | undefined {
    return undefined;
  }

  // null
  let person: null;
  person = null; // x
  let person2: string | null; // o (string or null)

  // unknown (가능하면 쓰지말자)
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  // any (가능하면 쓰지말자)
  let anything: any = 0;
  anything = 'hello';

  // void
  // return 값이 없으면 void
  // void는 생략가능
  function print(): void {
    console.log('hello');
    // return; (생략되어 있음)
  }
  // undefined만 할당 가능
  let unusable: void = undefined; // 쓰지말자

  // never
  // 절대 return 할 수 없음
  // error를 발생시키거나 while(true) 사용
  function throwError(message: string): never {
    // message -> server (log)
    //throw new Error(message);
    // while(true){

    // }
  }
  let neverEnding: never; // 쓰지말자

  // object
  // 어떤 것이든 담을 수 있다.
  let obj: object; // 쓰지말자
  function acceptSomeObject(obj: object) {
    
  }
  acceptSomeObject({ name: 'ellie' });
  acceptSomeObject({ animal: 'dog' });
}