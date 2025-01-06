export class Move {
    constructor(name, power, accuracy, speed = 5, type = 'normal') {
        this.name = name;
        this.power = power;       // e.g., 40 for Tackle
        this.accuracy = accuracy; // e.g., 95 (%
        this.speed = speed;
        this.type = "Normal";         // optional, e.g., "Normal", "Fire"
    }
}