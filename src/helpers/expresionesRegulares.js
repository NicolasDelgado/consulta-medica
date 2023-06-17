
export const expresionesRegulares = () => {
 
    const lowercaseRegEx = /(?=.*[a-z])/
    const uppercaseRegEx = /(?=.*[A-Z])/
    const numericRegEx = /(?=.*[0-9])/
    const lengthRegEx = /(?=.{6,})/

    return (
        lowercaseRegEx, uppercaseRegEx,numericRegEx,lengthRegEx
    )
  
}


