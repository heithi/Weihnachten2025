const snowflakeCount = 50; // Anzahl der Schneeflocken

for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❄";

    // Zufällige Position
    const randomLeft = Math.random() * 100; // Prozentwerte von 0 bis 100
    const randomAnimationDuration = 5 + Math.random() * 10; // 5 bis 15 Sekunden
    const randomDelay = Math.random() * 5; // Verzögerung bis 5 Sekunden

    // Styling der Schneeflocke
    snowflake.style.position = "absolute";
    snowflake.style.top = "-10%"; // Start über dem sichtbaren Bereich
    snowflake.style.left = `${randomLeft}%`; // Zufällige horizontale Position
    snowflake.style.animation = `fall ${randomAnimationDuration}s linear ${randomDelay}s infinite`; // Dynamische Dauer und Verzögerung

    document.getElementById("snowflakes").appendChild(snowflake);
}
