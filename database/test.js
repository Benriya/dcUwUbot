function checkLevels(level = 40, experience = 100) {
    let xp = 100;
    for (let i = 1; i <= 70; i++) {
        console.log(xp);
        if (i === level) {
            if (experience >= xp) {
                return xp;
            }
            return 0;
        }
        xp += i*50;
    }
    return 0;
}


checkLevels();
