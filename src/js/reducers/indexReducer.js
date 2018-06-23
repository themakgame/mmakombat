const initialState = {
    articles: [''],
    mainFighter: {},
    secondFighter: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MAINFIGHTER":
            return { ...state, mainFighter: action.payload };
        case "SET_SECONDFIGHTER":
            return { ...state, secondFighter: action.payload };
        default:
            return state;
    }
};


export default rootReducer;
