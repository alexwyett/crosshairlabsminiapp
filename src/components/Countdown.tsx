import useCountdown from "@bradgarropy/use-countdown";
import { Plural } from "@cagen/ezsite-components";

export default function Countdown({ date, onComplete }: { date: Date, onComplete?: Function }) {
  const countdown = useCountdown({
    seconds: (date.getTime() - Date.now()) / 1000,
    format: "mm:ss",
    autoStart: true,
    onCompleted: () => {
      onComplete?.();
    }
  })

  const [mins, seconds] = countdown.formatted.split(':');
  const hours = Math.floor(countdown.minutes / 60);
  return (
    <>{Number(hours) > 0 && <>{Number(hours)} <Plural count={Number(hours)} plural='hours' single='hour' /></>} {Number(mins) > 0 && <>{Number(mins)} <Plural count={Number(mins)} plural='min' single='min' /></>} {seconds}<Plural count={Number(seconds)} plural='s' single='s' /></>
  )
}