export const fetchProvinces = async () => {
  const response = await fetch("https://psgc.gitlab.io/api/provinces/");
  return response.json();
};

export const fetchCities = async (provinceCode: string) => {
  const response = await fetch(
    `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities`
  );
  return response.json();
};

export const fetchBarangays = async (cityCode: string) => {
  const response = await fetch(
    `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays`
  );
  return response.json();
};


export const convertProvinces = async (provinceCode: string) => {
    const response = await fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode}`);
    return response.json();
  };
  
  export const convertCities = async (provinceCode: string) => {
    const response = await fetch(
      `https://psgc.gitlab.io/api/municipalities/${provinceCode}/`
    );
    return response.json();
  };
  
  export const convertBarangays = async (cityCode: string) => {
    const response = await fetch(
      `https://psgc.gitlab.io/api/barangays/${cityCode}`
    );
    return response.json();
  };
  
  