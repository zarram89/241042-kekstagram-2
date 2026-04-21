const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingWithinWorkday = (workStart, workEnd, meetingStart, duration) => {
  const workStartMin = toMinutes(workStart);
  const workEndMin = toMinutes(workEnd);
  const meetingStartMin = toMinutes(meetingStart);
  const meetingEndMin = meetingStartMin + duration;

  console.log(meetingStartMin >= workStartMin && meetingEndMin <= workEndMin);
};

isMeetingWithinWorkday('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkday('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkday('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkday('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkday('8:00', '17:30', '08:00', 900); // false
