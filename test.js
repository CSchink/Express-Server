async function test() {
    setTimeout(() => {
        console.log("first");
    }, 1000);
}

test();

console.log("second");