

function myFunction(){
    for(var i=1;i<=2;i++)
    {
        console.log("I am var keyword");
    }
    console.log("var print value outside loop statement also",+i);
}
myFunction();

function myLetFunction(){
    for(let i=1;i<=2;i++)
    {
        console.log("I am let keyword");
    }
    console.log("let not allow to print outside loop statement", +i);
}
myLetFunction();