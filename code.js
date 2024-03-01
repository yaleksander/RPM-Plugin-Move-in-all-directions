import { RPM } from "../path.js"

const pluginName = "Move in all directions";
const inject = RPM.Manager.Plugins.inject;

function mod(x, m)
{
	const r = x % m;
	return r < 0 ? r + m : r;
}

RPM.Manager.Plugins.registerCommand(pluginName, "Move", (id, dir, camera) =>
{
	RPM.Core.MapObject.search(id, (result) =>
	{
		if (!!result)
		{
			result.object.move(RPM.Common.Enum.Orientation.South, RPM.Datas.Systems.SQUARE_SIZE, 180 - dir, camera);
			if (!result.object.currentStateInstance.directionFix)
			{
				if (camera)
					result.object.lookAt(mod(Math.round(dir / 90) + Scene.Map.current.camera.getMapOrientation() - 3, 4));
				else
					result.object.lookAt(mod(Math.round(dir / 90) - 1, 4));
			}
		}
	}, RPM.Core.ReactionInterpreter.currentObject);
});
