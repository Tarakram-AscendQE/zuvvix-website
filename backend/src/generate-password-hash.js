import bcrypt from "bcryptjs";
import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter admin password: ", async (password) => {
    try {
        const hash = await bcrypt.hash(password, 12);

        console.log("\nGenerated bcrypt hash:\n");
        console.log(hash);
    } catch (error) {
        console.error("Failed to generate password hash.");
        process.exitCode = 1;
    } finally {
        rl.close();
    }
});