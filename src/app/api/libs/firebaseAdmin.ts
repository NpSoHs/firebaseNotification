import { firebaseServiceAccount } from "@/utils/firebase";
import * as admin from "firebase-admin";

// เพิ่มประเภท admin.ServiceAccount เพื่อให้ TypeScript รู้จักว่าเป็นประเภทที่ต้องการ
const data: admin.ServiceAccount = {
  projectId: 'smartdoorbell-f9359',
  privateKey: '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCw9/8jnZ39DY9b\n' +
    '7c+4rBxHQwSxHnCfLyxUqCtTyblZVmgQZLDE7X3y4BXYn1fdUNfE4dKjVnBjR/Ah\n' +
    'wtMDGtqQlTtFWog6VsLS009k/UTXJ9dYIa0j+yTl9nZYOyBpG2SGy9n3n4+RYBH/\n' +
    'UOgVjMzeeLQCnimtpWnQTnoHazEvKBLREP+F8g2bNt06k0P9OZl3ZaZa9OhjAQOI\n' +
    '0MYkOBVtiIjd+EN2Zggfye2TMKFv/LPlo8vjip6WObY8Y5pVXIUA2Ah8mig7Hm+f\n' +
    'M6HlEKoxk426m51tA3mnNkxxLd2t6kbQYCplHJgMLVOlyYbHi4qTLA/Gt7tPfTlR\n' +
    'MaVjdeVvAgMBAAECggEAGnmXgXAInT2El3et7k5NUrnrf0XzClWH18hq5veUU5Gy\n' +
    'MtWlfmibQZUVn5lDD1iTVyCDny0E1k2CVsKrR9kiHqQ8wETpgXTOY7T6OT0MqfWL\n' +
    'aWNsYCgn3oFvNgbuc9sFwIbJvppv44tQVfZ4KhUs5xF+uK+Jw7Et8dxztB1st8WS\n' +
    'rUXAT6BZlcqTZGD3cD/58UIQvz08MpApnZtBIjbtLOIVjeKnt47MUX4+BULDy5Za\n' +
    'bcsnfRlyy4ZnrDtuDc/P8DiaytcNfrCur/oOiht8aRZbLAu+IIRccDpenmgjx8iD\n' +
    'E4h16A84JFaY0JRm58C+kAZZtD7OOhNUBlaedwribQKBgQDjFov0dkIrvWKOqG1F\n' +
    'kHuSpPE7k9Oiztg3640kmZVZHr8xuoEWb6sYxl04nAksE2TYsbKK9mSrHbeMng71\n' +
    '96rlO60Zrbzd4gfCLiwkdF7zEK2SVNabUe2r7P7OR7RpOpzsSOweMh2Jo1nsQUeI\n' +
    '5SfDsrcUajRYnby8/OxFg8Nd2wKBgQDHf+qpti0aP5UqwvcyFCN/+0c7mfI/niZ3\n' +
    'hL/2d3S7WL2oV8W5/bjCCkGScoTDQMgbo8Id6y21aCh3zXvC1/j9kjZHCWh5/kWT\n' +
    'OPNfGHde/aEVMn2oKVrXQWHweryKc1IVUnlm4VvSTTveKhsn9RFgh6GmoWRyAuAr\n' +
    'B6i+NOms/QKBgDdpsQ0eLlduBza4crGe6AiIpzTahbIctzYuDGr57y+oCQ+haw6G\n' +
    'gUGyZd0CdlqDAQC/m8m9BiObRMbTauMqZFE7lqnFc2jRVwNTMQJUQzccwr4KZbPQ\n' +
    '8iYZ1rOPW76xxskBolxb7kk/yxmTdFk7UdC3M2WP5OYa14tmTGFKHcoxAoGAZKcE\n' +
    'FRXl0Y1szANLxodklciIWujD0RcQn1Jpq4b/bRpLreiCyODa24NjK+j9VKmVjGRl\n' +
    'psSl7hWb/T2+CEMAy6Z+Hf8AKDSCk9Gy8DKe310lbVVpEnOy8lF5gWPbRhsCueE/\n' +
    'gQmIUyVGZENoKhO57bLgevqIfAE5alxV5Yk6sF0CgYEAtssE7IE2pCaCU/ELGJ4C\n' +
    'puWndd8kSITolGIk2Xh6Bn0gJE4cOkE4mAwsGzadscilWfuvmGFcpNUDQeOw9c5+\n' +
    '63MtuUbSlAlBKE4Ay19KdpOJt9mnMPPk+whQPi+NG9GGFPJ+5XkKa1bz6XYCSyI7\n' +
    '7jR6DzHOXfPFTqAtGCOuoNw=\n' +
    '-----END PRIVATE KEY-----\n',
  clientEmail: 'firebase-adminsdk-u09bx@smartdoorbell-f9359.iam.gserviceaccount.com',
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(data),
  });
} else {
  admin.app();
}

export { admin };