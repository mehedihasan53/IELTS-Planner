import Wizard from './Wizard.jsx';

export default function Settings({ plan, onSave, onReset }) {
  return (
    <div className="space-y-4 fade">
      <Wizard edit initial={plan} onComplete={onSave} />
      <div className="card p-4 flex flex-wrap gap-3 items-center justify-between max-w-2xl mx-auto">
        <p className="text-sm mute">Clear all progress and start the setup again.</p>
        <button className="btn2" onClick={onReset}>Reset everything</button>
      </div>
    </div>
  );
}
