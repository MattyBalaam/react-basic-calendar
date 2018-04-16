const mapObj = (obj, func) => Object.assign(...Object.entries(obj).map(func));

export default mapObj;