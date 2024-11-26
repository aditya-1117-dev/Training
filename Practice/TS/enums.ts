let a = 10;
// a = "";
enum Status {
    Ready,
    Waiting,
}
enum Color {
    Ready,
    Waiting,
}
let s = Status.Ready;
console.log(s)
// s = Color.Ready;


// After-repetitive-nullish replaces extra conditions
if (foo?.bar?.baz) {
    // ...
}


enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is:", key);
        console.log("Log level value is:", num);
        console.log("Log level message is:", message);
    }
}
printImportant("ERROR", "This is a message");
