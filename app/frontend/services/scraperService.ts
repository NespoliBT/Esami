import axios from "axios";
import { configService } from "./configService";

export module scraperService {
    export async function getLectures(url) {
        let data = url

        const response = await axios.post(
            'https://gestioneorari.didattica.unimib.it/PortaleStudentiUnimib/grid_call.php',
            data,
            {
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache'
                }
            }
        )

        return response.data
    }
}
