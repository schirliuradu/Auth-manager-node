import app from "./src/app";
import {bootAppDependencies} from "./src/utils/boot/boot";

const port = process.env.PORT || 3000

app.listen(port, async () => {
    await bootAppDependencies()
})
