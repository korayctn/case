const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMZWFkU291cmNlSWQiOiIiLCJDdXN0b21lcklEIjoiNTU2NjkiLCJTZXNzaW9uSUQiOiI3YjUzM2MwZC00ZGI1LTQ2NGUtOGNkZC0wMzFlZGQ3OWZkYjEiLCJDUk1UcmFuc2FjdGlvbklkIjoiIiwiQ1JNVXNlcklkIjoiIiwiQ1JNTG9jYXRpb25JZCI6IiIsIkVtYWlsIjoiIiwiUGhvbmVOdW1iZXIiOiIiLCJDdXN0b21lckF1dGhUeXBlIjozLCJJc1NpZ25JbiI6ZmFsc2UsIklzR3Vlc3QiOnRydWUsIklzQ1JNVXNlciI6ZmFsc2UsIklwQWRkcmVzcyI6IjEyNy4wLjAuMSIsIlRlbmFudElkIjoiMzIiLCJuYmYiOjE2OTU2MzE0MTYsImV4cCI6MTY5NTcxNzgxNiwiaXNzIjoiQmVybXVkYSBTb2Z0IiwiYXVkIjoiSXpzdXJlIFJhdGluZyJ9.7Xl3H0jNYyNa66mAfdtXvPwmD7Lo5i4WBoxD9U7o5rE";

  https://api-dev.thebermuda.us/rating/api/rating/getPolicyCoverages?State=TX
  
const authConfig = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

export { authConfig };
