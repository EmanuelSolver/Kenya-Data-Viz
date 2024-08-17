
const Reducer = (state, action) => {
    switch (action.type) {
        case "PROFILE":
            return{
                navigator: action.payload,
            }
        case "DASHBOARD1":
            return{
               navigator: action.payload,
            }
        case "DASHBOARD2":
            return{
                navigator: action.payload,
            }
        case "DASHBOARD3":
            return{
                navigator: action.payload,
            }
        case "D3-PAGE1":
            return{
                navigator: action.payload,
            }
        case "D3-PAGE2":
                return{
                    navigator: action.payload,
                }
        case "FINANCIALANALYSIS":
            return{
                navigator: action.payload,
            }
        case "FA-PAGE1":
            return{
                navigator: action.payload,
            }
        case "FA-PAGE2":
                return{
                    navigator: action.payload,
                }
        default:
            return state;
    }
}

export default Reducer