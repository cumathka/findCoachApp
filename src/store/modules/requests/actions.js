export default {
  async contactCoach(contex, payload) {
    const newRequests = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://vue-http-demo-ce577-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequests),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request');
      throw error;
    }

    newRequests.id = responseData.name;
    newRequests.coachId = payload.coachId;

    contex.commit('addRequest', newRequests);
  },
  async fetchRequests(contex) {
    const coachId = contex.rootGetters.userId;
    const token = contex.rootGetters.token ;
    const response = await fetch(
      `https://vue-http-demo-ce577-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests'
      );
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    contex.commit('setRequests', requests);
  },
};
