export default function NoRoleMessage() {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex flex-col items-center px-6 py-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl backdrop-blur-sm">
        <span className="text-2xl mb-2">⚠️</span>
        <h3 className="text-white font-bold text-lg mb-2">
          No Eligible Role Found
        </h3>
        <p className="text-white/80 text-sm max-w-md">
          You don&apos;t have any eligible Discord roles for minting a RISE
          Passport. Please join the RISE Discord server and get assigned a role.
        </p>
      </div>
    </div>
  );
}
