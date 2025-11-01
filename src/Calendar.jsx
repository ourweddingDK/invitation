import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import '@fontsource-variable/caveat';

const CalendarHeader = styled(Typography)(({ theme }) => ({
  fontSize: '1em',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  fontFamily: '"Caveat Variable", cursive'
}));

const DayCell = styled(TableCell)(({ theme, isCurrentMonth, isToday, isWeekend, hasHeart }) => ({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  backgroundColor: isCurrentMonth ? 'white' : theme.palette.action.disabledBackground,
  color: !isCurrentMonth ? theme.palette.text.disabled : (isToday ? "red": theme.palette.text.primary),
  fontWeight: isToday ? 'bold' : 'normal',
  fontSize: '0.8em',
  position: 'relative',
  fontFamily: '"Caveat Variable", cursive',
  ...(isWeekend && {
    color: isCurrentMonth && !isToday ? theme.palette.text.primary : isCurrentMonth && isToday ? "red" : undefined,
  }),
  ...(hasHeart && {
    background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f44336' width='24' height='24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E") no-repeat center`,
    backgroundSize: '40px 40px',
  }),
}));

const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();
  const calendarDays = [];

  const prevMonthDays = (firstDay + 6) % 7;
  for (let i = prevMonthDays; i > 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i + 1,
      isCurrentMonth: false,
      isToday: false,
      isWeekend: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isToday = date.toDateString() === new Date().toDateString();
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isToday,
      isWeekend,
      hasHeart: day === 30 && month === 11 && year === 2025,
    });
  }
  const totalCells = 42;
  const currentLength = calendarDays.length;
  for (let i = 1; i <= totalCells - currentLength; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      isWeekend: false,
    });
  }

  return calendarDays;
};

const Calendar = ({ isMobile, lang, year = 2025, month = 11 }) => {
  const days = generateCalendarDays(year, month);
  let weekdays = lang == "VI" ? ['H', 'B', 'T', 'N', 'S', 'B', 'CN'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Box sx={{ p: 2 , width:isMobile ? "100%" : "40%"}}>
      <CalendarHeader fontFamily={'"Caveat Variable", cursive'}>{lang == "VI" ? "Tháng 11 - 2025" : "November - 2025"}</CalendarHeader>
       <Box sx={{width: "100%",  overflow: 'hidden' }}> 
      <TableContainer component={Paper} elevation={0} sx={{ width:"100%",justifyItems:"center"}}>
        <Table size="small" sx={{ width:"50%"}}>
          <TableHead sx={{ width:"90%"}}>
            <TableRow sx={{ width:"90%"}}>
              {weekdays.map((day,index) => (
                <TableCell
                  key={day+index}
                  sx={{
                    width: '100%',
                    height: "100%",
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontFamily: '"Caveat Variable", cursive',
                    border: 'none',
                    backgroundColor: 'grey.100',
                  }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ width:"90%"}}>
            {Array.from({ length: 6 }, (_, weekIndex) => (
              <TableRow key={weekIndex} sx={{ width:"90%"}}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const cellIndex = weekIndex * 7 + dayIndex;
                  const { day, isCurrentMonth, isToday, isWeekend, hasHeart } = days[cellIndex];
                  return (
                    <DayCell
                      key={dayIndex}
                      isCurrentMonth={isCurrentMonth}
                      isToday={isToday}
                      isWeekend={isWeekend}
                      hasHeart={hasHeart}
                    >
                      {hasHeart ? (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                          }}
                        >
                          {day}
                        </Box>
                      ) : (
                        day
                      )}
                    </DayCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       </Box>
    </Box>
  );
};

export default Calendar;