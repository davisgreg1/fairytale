const capitalizedFirstName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).split(" ")[0];
};

export default capitalizedFirstName;
