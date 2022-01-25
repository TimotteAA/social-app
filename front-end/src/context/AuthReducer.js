// 根據action.type，產生新的state
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFecthing: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFecthing: true,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFecthing: false,
        error: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW": {
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };
    }
    case "LOG_OUT": {
      // 清空localStorage
      localStorage.clear();
      return {
        ...state,
        user: null,
        isFecthing: false,
        error: false,
      };
    }
    case "CHANGE_INFO": {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
