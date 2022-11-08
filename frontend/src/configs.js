const URI_USER_SVC = process.env.URI_USER_SVC || 'http://' + process.env.REACT_APP_USER_SERVER_IP + ':' + process.env.REACT_APP_USER_SERVER_PORT

const PREFIX_USER_SVC = '/api/user'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
