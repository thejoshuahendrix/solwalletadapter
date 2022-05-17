import "styled-components";



declare module 'styled-components' {
    export interface DefaultTheme {
        text: {
            primary: string,
            secondary: string,
            ternary: string
        },
        card: {
            borderRadius: string,
            boxShadow: string,
            boxShadowSmall: string,
            gradient: string
        },
        button: {
            text: string,
            background: string
        },
        background:{
            primary: string,
            secondary: string,
            ternary:string,
            four:string
        } 
    
        mobile:string
    }
}