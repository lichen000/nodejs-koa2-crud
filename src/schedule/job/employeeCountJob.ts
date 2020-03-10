import { employeeService } from "../../service/employeeService"
import { LOGGER } from "../../common/utils/logUtil";

let job  = {    
    async run(): Promise<void> {
        let count = await employeeService.count();
        LOGGER.info(`count = ${count}`)
    }
}

export {job}