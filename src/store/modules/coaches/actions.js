export default {
  async registerCoach(contex, data) {
    const userId = contex.rootGetters.userId;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.areas,
      description: data.description,
      hourlyRate: data.rate,
    };

    const token = contex.rootGetters.token ;

    const response = await fetch(
      `https://vue-http-demo-ce577-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=`+ token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to register coach');
    }

    contex.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(contex,payload) {
        if(!payload.forceRefresh && !contex.getters.shouldUpdate){
          return;
        }

    const response = await fetch(
      `https://vue-http-demo-ce577-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
     const error =  new Error(responseData.message || 'Failed to fetch coaches');
     throw error;
    }
    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);

    }
      contex.commit('setCoaches',coaches);
      contex.commit('setFetchTimestamp')
  },
};
