(() => {
    console.log("1st");

    setTimeout(() => {
        console.log("set1");
    });

    console.log("2nd");

    setTimeout(() => {
        console.log("set2");
    }, 0);

    console.log("3rd");

    console.log("3" + 4 + 5, 3 + 4 + "5")
})();