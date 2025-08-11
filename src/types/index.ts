export interface ClassTime {
  startTime: string;
  endTime: string;
}

export interface ClassInfo {
  pageTitle: string;
  class1Subject: string;
  class2Subject: string;
  classTimeLabel: string;
  classTimeLabel2: string;
  class1LiveStreamUrl: string;
  class2LiveStreamUrl: string;
  class1Visible: boolean;
  class2Visible: boolean;
  class1Times: ClassTime;
  class2Times: ClassTime;
}

export interface ApiResponse {
  [key: string]: ClassInfo;
}
