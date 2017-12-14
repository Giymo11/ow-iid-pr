import scala.scalajs.js.annotation._
import org.scalajs.dom

import scala.scalajs.js
import scala.scalajs.js.{Dictionary, JSON}
import js.JSConverters._
import scala.annotation.meta.field
import scala.collection.{immutable, mutable}
import scala.util.Random


@JSExportTopLevel("OwData")
object OwData {
  protected def getInstance(): this.type = this

  @JSExport
  def main(args: Array[String]): Unit = println("Hello from Scala!")


  val maps = Seq("hanamura", "illios")
  val heroes = Seq("mercy", "soldier")

  def genCoords() = {
    var x = Random.nextDouble() - 0.5
    var y = Random.nextDouble() - 0.5

    val len = Math.sqrt((x*2) * (x*2) + y*2 * y*2)
    if(len > 0.8)
      (x/2.0 + 0.5, y/2.0 + 0.5)
    else
      (x + 0.5, y + 0.5)
  }

  def genElimClusters(maxCount: Int, maxAmount: Int): Seq[Cluster] = {
    for  {
      index <- 0 to Random.nextInt(maxCount)
      amountRange <- 0 to Random.nextInt(maxAmount)
      amount = amountRange + 1
      (x, y) = genCoords()
    } yield Cluster(x, y, amount / 7.0, amount)
  }

  def genAbilityCluster(maxCount: Int, maxAmount: Int, text: String): Seq[AbilityCluster] = {
    for  {
      index <- 0 to Random.nextInt(maxCount)
      amountRange <- 0 to Random.nextInt(maxAmount)
      amount = amountRange + 1
      (x, y) = genCoords()
    } yield AbilityCluster(x, y, amount / 7.0, amount + "x " + text)
  }

  def genHeatmapData(width: Double, height: Double, maxCount: Int, maxAmount: Int, minAmount: Int) = {
    for  {
      index <- 0 to Random.nextInt(maxCount)
      amountRange = Random.nextInt(maxAmount - minAmount)
      amount = amountRange + minAmount
      (x, y) = genCoords()
      xVal = (x * width).toInt
      yVal = (y * height).toInt
    } yield js.Dynamic.literal(x = xVal, y = yVal, value = amount)
  }

  @JSExport
  def genEliminationCluster(): Dictionary[Dictionary[js.Array[Cluster]]] = {
    Dictionary(
      "hanamura" -> Dictionary(
        "mercy" -> genElimClusters(5, 4).toJSArray,
        "soldier" -> genElimClusters(7, 9).toJSArray
      ),
      "ilios" -> Dictionary(
        "mercy" -> genElimClusters(4, 4).toJSArray,
        "soldier" -> genElimClusters(6, 8).toJSArray
      )
    )
  }

  @JSExport
  def genAbilityMarkers(): Dictionary[Dictionary[js.Array[AbilityCluster]]] = {
    Dictionary(
      "hanamura" -> Dictionary(
        "mercy" -> (genAbilityCluster(5, 3, "E") ++ genAbilityCluster(4, 2, "Q") ++ genAbilityCluster(20, 1, "LSHIFT")).toJSArray,
        "soldier" -> (genAbilityCluster(5, 3, "E") ++ genAbilityCluster(4, 2, "Q") ++ genAbilityCluster(20, 1, "LSHIFT")).toJSArray
      ),
      "ilios" -> Dictionary(
        "mercy" -> (genAbilityCluster(5, 3, "E") ++ genAbilityCluster(4, 2, "Q") ++ genAbilityCluster(20, 1, "LSHIFT")).toJSArray,
        "soldier" -> (genAbilityCluster(5, 3, "E") ++ genAbilityCluster(4, 2, "Q") ++ genAbilityCluster(20, 1, "LSHIFT")).toJSArray
      )
    )
  }

  @JSExport
  def genDamageHeatmapData(width: Double, height: Double): Dictionary[Dictionary[js.Array[js.Object with js.Dynamic]]] = {
    Dictionary(
      "hanamura" -> Dictionary(
        "mercy" -> genHeatmapData(width, height, 150, 100, 12).toJSArray,
        "soldier" -> genHeatmapData(width, height, 400, 200, 50).toJSArray
      ),
      "ilios" -> Dictionary(
        "mercy" -> genHeatmapData(width, height, 100, 125, 12).toJSArray,
        "soldier" -> genHeatmapData(width, height, 400, 200, 25).toJSArray
      )
    )
  }

  @JSExport
  def genHealingHeatmapData(width: Double, height: Double): Dictionary[Dictionary[js.Array[js.Object with js.Dynamic]]] = {
    Dictionary(
      "hanamura" -> Dictionary(
        "mercy" -> genHeatmapData(width, height, 500, 200, 25).toJSArray,
        "soldier" -> genHeatmapData(width, height, 50, 200, 75).toJSArray
      ),
      "ilios" -> Dictionary(
        "mercy" -> genHeatmapData(width, height, 300, 200, 50).toJSArray,
        "soldier" -> genHeatmapData(width, height, 20, 200, 100).toJSArray
      )
    )
  }
}


@JSExportAll
case class Cluster(x: Double, y: Double, radius: Double, count: Int)

@JSExportAll
case class AbilityCluster(x: Double, y: Double, radius: Double, text: String)

@JSExportAll
case class HeatmapDatapoint(@(JSExport @field)("x") x: Double, @(JSExport @field)("y") y: Double, @(JSExport @field)("value") value: Double)

@ScalaJSDefined
trait Clusterlike extends js.Object {
  val x: js.UndefOr[Double] = js.undefined
  val y: js.UndefOr[Double] = js.undefined
  val radius: js.UndefOr[Double] = js.undefined
  val count: js.UndefOr[Int] = js.undefined
}


