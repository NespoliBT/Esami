import { ipcRenderer } from 'electron'

export module bridgeService {
    export function message(name: string, data: any = {}) {
        return new Promise((resolve, reject) => {
            ipcRenderer.send(name, data)
            ipcRenderer.once(name, (event, data) => {
                resolve(data)
            })
        })
    }
}