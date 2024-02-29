 export const choisesRole = val =>{
    if(val == 'staff'){
        return 'xodim'
    }else if(val == 'staff_admin'){
        return 'Bo`lim boshlig`i'
    } else if(val == 'chief'){
        return "Raxbar"
    }


}

export const choisesForm = val =>{
    if(val == 'output'){
        return 'chiqim'
    }else if(val == 'income'){
        return 'kirim'
    }
}

export const choisesType = val =>{
    if(val == 'order'){
        return 'buyruq'
    }else if (val == 'decision'){
        return 'qaror'
    }else if( val == 'decree' ){
        return 'farmoyish'
    }
}

export const choisesMeasurement_type = val =>{
    if(val == 'set'){
        return 'dona'
    }else if(val == 'piece'){
        return 'komplekt'
    }
}

export const openFile = val =>{
    let fileLink = document.createElement('a')
    fileLink.href = val
    fileLink.setAttribute('download', val)
    document.body.appendChild(fileLink)
    fileLink.click()
}