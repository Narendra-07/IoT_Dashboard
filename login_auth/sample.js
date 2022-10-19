function myFunction() {
    for (var i = 1; i <= 2; i++) {
        console.log("I am var keyword");
    }
    console.log("var print outside loop statement also", +i);
}
myFunction();
function myLetFunction() {
    for (var i = 1; i <= 2; i++) {
        console.log("I am let keyword");
    }
    console.log("let not print outside loop statement");
}
myLetFunction();
